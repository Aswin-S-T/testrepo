module.exports = shipit => {
    require('shipit-deploy')(shipit)
    var utils = require('shipit-utils');

  
    shipit.initConfig({
        default: {
            branch: 'master',
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
        },
        dev: {
            servers: 'user@localhost'
        },
        staging: {
            servers: 'ec2-user@ec2-52-66-53-207.ap-south-1.compute.amazonaws.com',
            buildCmd: 'build:staging'
        }
    });

    var start_dev = function() {
        return shipit.local([
            'mkdir ' + shipit.config.workspace,
            'cd ' + shipit.config.workspace,
            '. ~/.nvm/nvm.sh',
            'nvm use 12',
            'npm run build:dev',
            'mv build/  ' + shipit.config.backendAppPath + '/public/',
            'cd '+ shipit.config.backendAppPath ,
            'nvm use 8',
            'npm run start:dev'
        ].join('&&'));
    };

    shipit.blTask('buildTask', async () => {
        await shipit.remote('pwd')
        await shipit.local([
            'mkdir ' + shipit.config.workspace,
            'cd ' + shipit.config.workspace,
            'git clone ' + shipit.config.frontendAppRepositoryUrl,
            'cd envitusplatformfrontend',
            '. ~/.nvm/nvm.sh',
            'nvm use 12',
            'npm i',
            'npm run build:dev',
            'mv build/  ' + shipit.workspace + '/public/',
            'rm -rf' + shipit.config.workspace
        ].join('&&'));
    })

    shipit.blTask('remoteUpTask', async () => {
        await shipit.remote([
            'cd ' + shipit.config.workspace + '/current',
            'nvm use 8',
            'npm i',
            'npm run ' + shipit.config.buildCmd
        ].join('&&'));
    })

    shipit.on('fetched',function(){
        shipit.start("buildTask");
    })

    shipit.on('published',function(){
        shipit.start("remoteUpTask");
    })
    
    utils.registerTask(shipit, 'start:dev', start_dev);
}