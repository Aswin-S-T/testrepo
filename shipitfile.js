module.exports = shipit => {
    require('shipit-deploy')(shipit)
    var utils = require('shipit-utils');

  
    shipit.initConfig({
        default: {
            branch: process.env.GIT_BRANCH || 'master',
            workspace: '/tmp/github-monitor',
            deployTo: '/home/ec2-user/alcodex_deploy',
            repositoryUrl: 'https://' + process.env.GIT_USERNAME + ':' + process.env.GIT_TOKEN + '@github.com/abdulalcodex/envitusplatformbackend.git',
            ignores: ['.git', 'node_modules'],
            keepReleases: 3,
            key: '/home/nikhilbs/work/alcodex/keys/t2MicroTrial.pem',
            shallowClone: true,
            frontendAppPath: process.env.FRONTEND_APP_PATH || '$HOME/work/alcodex/envitusplatformfrontend',
            backendAppPath: process.env.PWD,
            frontendAppRepositoryUrl: 'https://' + process.env.GIT_USERNAME + ':' + process.env.GIT_TOKEN + '@github.com/abdulalcodex/envitusplatformfrontend.git',
            frontendAppbranch: process.env.FRONTEND_APP_BRANCH || 'master',
        },
        dev: {
            servers: 'user@localhost'
        },
        dev_deploy: {
            repositoryUrl: '',
            servers: process.env.DEPLOY_SERVER || 'ec2-user@ec2-52-66-53-207.ap-south-1.compute.amazonaws.com',
            forntendBuildCmd: process.env.FRONTENT_APP_BUILD_CMD || 'build:staging',
            buildCmd: process.env.BUILD_CMD || 'build:staging',
        },
        staging: {
            servers: 'ec2-user@ec2-52-66-53-207.ap-south-1.compute.amazonaws.com',
            buildCmd: 'build:staging',
            forntendBuildCmd: 'build:staging'
        }
    });

    var start_dev = function() {
        return shipit.local([
            'cd ' + shipit.config.frontendAppPath,
            '. ~/.nvm/nvm.sh',
            'nvm use 12',
            'npm run build:dev',
            'cp -r build/  ' + shipit.config.backendAppPath + '/public/',
            'cd '+ shipit.config.backendAppPath ,
            'nvm use 8',
            'pm2 stop all',
            'pm2 delete all',
            'npm run start:dev'
        ].join('&&'));
    };

    shipit.blTask('buildLocalTask', async () => {
        shipit.log(shipit.workspace)
        await shipit.local([
            'rsync -rv --exclude node_modules ' + shipit.config.backendAppPath + '/ ' + shipit.workspace,
            'cd ' + shipit.config.frontendAppPath,
            '. ~/.nvm/nvm.sh',
            'nvm use 12',
            'npm run ' + shipit.config.forntendBuildCmd,
            'cp -r build/  ' + shipit.workspace + '/public/',
        ].join('&&'));
    })

    shipit.blTask('buildTask', async () => {
        await shipit.remote('pwd')
        await shipit.local([
            'mkdir ' + shipit.config.workspace,
            'cd ' + shipit.config.workspace,
            'git clone ' + shipit.config.frontendAppRepositoryUrl,
            'cd envitusplatformfrontend',
            'git checkout ' + shipit.config.frontendAppbranch,
            '. ~/.nvm/nvm.sh',
            'nvm use 12',
            'npm i',
            'npm run ' + shipit.config.forntendBuildCmd,
            'mv build/  ' + shipit.workspace + '/public/',
            'rm -rf ' + shipit.config.workspace
        ].join('&&'));
    })

    shipit.blTask('remoteUpTask', async () => {
        await shipit.remote([
            'cd ' + shipit.config.deployTo + '/current',
            'nvm use 8',
            'npm i',
            'pm2 stop all',
            'pm2 delete all',
            'npm run ' + shipit.config.buildCmd
        ].join('&&'));
    })

    shipit.on('fetched',function() {
        console.log(shipit.environment)
        if(shipit.environment === 'dev_deploy') {
            shipit.start("buildLocalTask");
        } else {
            shipit.start("buildTask");
        }
    })

    shipit.on('published',function() {
        shipit.start("remoteUpTask");
    })
    
    utils.registerTask(shipit, 'start:dev', start_dev);
}