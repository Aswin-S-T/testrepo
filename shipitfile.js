module.exports = shipit => {
    require('shipit-deploy')(shipit)

    shipit.initConfig({
        default: {
            branch: process.env.GIT_BRANCH || 'master',
            workspace: '/tmp/github-monitor',
            deployTo: '/root/AHU',
            repositoryUrl: 'https://' + process.env.GIT_USERNAME + ':' + process.env.GIT_TOKEN + '@github.com/abdulalcodex/envitusplatformbackend.git',
            ignores: ['.git', 'node_modules'],
            keepReleases: 3,
            key: '~/.ssh/nikhil-alcdx2',
            shallowClone: true,
            frontendAppPath: process.env.FRONTEND_APP_PATH || '$HOME/work/alcodex/envitusplatformfrontend',
            backendAppPath: process.env.PWD,
            frontendAppRepositoryUrl: 'https://' + process.env.GIT_USERNAME + ':' + process.env.GIT_TOKEN + '@github.com/abdulalcodex/envitusplatformfrontend.git',
            frontendAppbranch: process.env.FRONTEND_APP_BRANCH || 'master',
        },
        dev: {
            servers: 'user@localhost',
            buildCmd: 'start:dev',
            forntendBuildCmd: 'build:dev',
            pm2AppNames: process.env.PM2_APP_NAME
        },
        stage: {
            servers: 'user@localhost',
            buildCmd: 'start:stage',
            forntendBuildCmd: 'build:staging',
            pm2AppNames: process.env.PM2_APP_NAME
        },
        prod: {
            servers: 'user@localhost',
            buildCmd: 'start:prod',
            forntendBuildCmd: 'build:prod',
            pm2AppNames: process.env.PM2_APP_NAME
        },
    });

    shipit.blTask('startDev', async () => {
        return shipit.local([
            'cd ' + shipit.config.frontendAppPath,
            'rm -rf build',
            'yarn install',
            'yarn run ' + shipit.config.forntendBuildCmd,
            'rm -rf ' + shipit.config.backendAppPath + '/src/public/',
            'mv  build/  ' + shipit.config.backendAppPath + '/src/public/',
            'cd ' + shipit.config.backendAppPath,
            'yarn install',
            'pm2 stop ' + shipit.config.pm2AppNames + ' || true',
            'pm2 delete ' + shipit.config.pm2AppNames + ' || true',
            'yarn run ' + shipit.config.buildCmd
        ].join('&&'));
    });

    shipit.blTask('startES', async () => {
        return shipit.local([
            'cd ' + shipit.config.frontendAppPath,
            'rm -rf build',
            'yarn install',
            'yarn run ' + shipit.config.forntendBuildCmd,
            'rm -rf ' + shipit.config.backendAppPath + '/src/public/',
            'mv  build/  ' + shipit.config.backendAppPath + '/src/public/',
            'cd ' + shipit.config.backendAppPath,
            'yarn install',
            'pm2 stop ' + shipit.config.pm2AppNames + ' || true',
            'pm2 delete ' + shipit.config.pm2AppNames + ' || true',
            'yarn run ' + shipit.config.buildCmd
        ].join('&&'));
    });

    shipit.blTask('startDocker', async () => {
        return shipit.local([
            'cd ' + shipit.config.frontendAppPath,
            'yarn install',
            'yarn run ' + shipit.config.forntendBuildCmd,
            'cp -r build/  ' + shipit.config.backendAppPath + '/src/public/',
            'cd ' + shipit.config.backendAppPath,
            'docker container stop $(docker container ls -a -q --filter name=envitus) || true',
            'docker rm $(docker container ls -a -q --filter name=envitus) || true',
            'docker rmi $(docker images "envitus" -q | uniq) || true',
            'docker build -t envitus . ',
            'docker run -d --name envitus --network host envitus'
        ].join('&&'));
    })

    shipit.blTask('buildDockerImg', () => {
        return shipit.local([
            'cd ' + shipit.workspace,
            'docker container stop $(docker container ls -a -q --filter name=envitus) || true',
            'docker rm $(docker container ls -a -q --filter name=envitus) || true',
            'docker image rmi $(docker images "envitus" -q | uniq) || true',
            'docker build -t envitus . --build-arg runCommand=' + shipit.config.dockerBuildCmd,
            'docker save envitus | gzip envitus.tar.gz'
        ].join('&&'))
    });

    shipit.on('fetched', function () {
        console.log(shipit.environment)
        if (shipit.environment === 'dev_deploy') {
            shipit.start("buildLocalTask");
        } else {
            shipit.start("buildTask");
        }
    })

    shipit.on('deployed', function () {
        shipit.start("remoteUpTask");
    })
}
