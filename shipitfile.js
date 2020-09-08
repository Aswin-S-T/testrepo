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
            pm2AppNames: 'Envitus-dev Envitus-AlarmService'
        },
        dev_PBMS: {
            servers: 'user@localhost',
            buildCmd: 'start:dev_PBMS',
            forntendBuildCmd: 'build:PBMS',
            pm2AppNames: 'Envitus-PBMS-dev'
        },
        dev_Jhansi: {
            servers: 'user@localhost',
            buildCmd: 'start:dev_Jhansi',
            forntendBuildCmd: 'build:Jhansi',
            pm2AppNames: 'Envitus-Jhansi-dev Envitus-Jhansi-AlarmService'
        },
        dev_deploy: {
            repositoryUrl: '',
            deployTo: process.env.DEPLOY_PATH ||'/root/AHU',
            servers: process.env.DEPLOY_SERVER || 'root@159.89.163.128',
            forntendBuildCmd: process.env.FRONTENT_APP_BUILD_CMD || 'build:staging',
            buildCmd: process.env.BUILD_CMD || 'build:staging',
            pm2AppNames: process.env.PM2_APP_NAME || 'Envitus-dev Envitus-AlarmService',
            dockerBuildCmd: process.env.DOCKER_BUILD_CMD || 'build:staging_docker'
        },
        staging: {
            servers: 'root@159.89.163.128',
            deployTo: '/root/AHU',
            buildCmd: 'build:staging',
            forntendBuildCmd: 'build:staging',
            dockerBuildCmd: 'build:staging_docker',
            pm2AppNames: 'Envitus-staging Envitus-AlarmService'
        },
        staging_PBMS: {
            servers: 'root@159.89.163.128',
            deployTo: '/root/PBMS',
            buildCmd: 'build:staging_PBMS',
            forntendBuildCmd: 'build:PBMS_staging',
            dockerBuildCmd: 'build:staging_docker_PBMS',
            pm2AppNames: 'Envitus-PBMS-staging'
        },
        staging_Jhansi: {
            servers: 'root@159.89.163.128',
            deployTo: '/root/Jhansi',
            buildCmd: 'build:staging_Jhansi',
            forntendBuildCmd: 'build:Jhansi_staging',
            dockerBuildCmd: 'build:staging_docker_Jhansi',
            pm2AppNames: 'Envitus-Jhansi-staging Envitus-Jhansi-AlarmService'
        },
        staging_chennailnt: {
            servers: 'root@159.89.163.128',
            deployTo: '/root/chennailnt',
            buildCmd: 'build:staging_chennailnt',
            forntendBuildCmd: 'build:chennailnt',
            pm2AppNames: 'Envitus-chennailnt-dev Envitus-chennailnt-AlarmService'
        }
    });

    shipit.blTask('startDev', async () => {
        return shipit.local([
            'cd ' + shipit.config.frontendAppPath,
            '. ~/.nvm/nvm.sh',
            'nvm use 12',
            'rm -rf build',
            'npm run ' + shipit.config.forntendBuildCmd,
            'mv -r build/  ' + shipit.config.backendAppPath + '/public/',
            'cd '+ shipit.config.backendAppPath ,
            'nvm use 8',
            'pm2 stop ' + shipit.config.pm2AppNames + ' || true',
            'pm2 delete ' + shipit.config.pm2AppNames + ' || true',
            'npm run ' + shipit.config.buildCmd
        ].join('&&'));
    });

    shipit.blTask('buildLocalTask', async () => {
        shipit.log(shipit.workspace)
        await shipit.local([
            'rsync -rv --exclude node_modules ' + shipit.config.backendAppPath + '/ ' + shipit.workspace,
            'cd ' + shipit.config.frontendAppPath,
            '. ~/.nvm/nvm.sh',
            'nvm use 12',
            'rm -rf build',
            'npm run ' + shipit.config.forntendBuildCmd,
            'cp -r build/  ' + shipit.workspace + '/public/',
        ].join('&&'));
    })

    shipit.blTask('buildTask', async () => {
        await shipit.local([
            'rm -rf ' + shipit.config.workspace +' || true',
            'mkdir ' + shipit.config.workspace + ' || true',
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
            'echo $PATH',
            'export NVM_DIR=$HOME/.nvm',
            'source $NVM_DIR/nvm.sh',
            'nvm use 8',
            'npm i',
            'pm2 stop ' + shipit.config.pm2AppNames + ' || true',
            'pm2 delete ' + shipit.config.pm2AppNames + ' || true',
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

    shipit.on('deployed',function() {
        shipit.start("remoteUpTask");
    })

    shipit.blTask('devDocker', async () => {
        return shipit.local([
            'cd ' + shipit.config.frontendAppPath,
            '. ~/.nvm/nvm.sh',
            'nvm use 12',
            'npm run build:dev',
            'cp -r build/  ' + shipit.config.backendAppPath + '/public/',
            'cd '+ shipit.config.backendAppPath,
            'docker container stop $(docker container ls -a -q --filter name=envitus) || true',
            'docker rm $(docker container ls -a -q --filter name=envitus) || true',
            'docker rmi $(docker images "envitus" -q | uniq) || true',
            'docker build -t envitus . ',
            'docker run -d --name envitus --network host envitus'
        ].join('&&'));
    })

    shipit.blTask('buildDockerImgZip', () => {
        return shipit.local([
            'cd ' + shipit.workspace,
            'docker container stop $(docker container ls -a -q --filter name=envitus) || true',
            'docker rm $(docker container ls -a -q --filter name=envitus) || true',
            'docker image rmi $(docker images "envitus" -q | uniq) || true',
            'docker build -t envitus . --build-arg runCommand='+ shipit.config.dockerBuildCmd,
            'docker save envitus -o envitus.tar.gz',
            'ls -I "envitus.tar.gz" | xargs rm -rf'
        ].join('&&'))
    });

    shipit.blTask('remoteUpDocker', () => {
        return shipit.remote([
            'cd ' + shipit.config.deployTo + '/current',
            'docker container stop $(docker container ls -a -q --filter name=envitus) || true',
            'docker rm $(docker container ls -a -q --filter name=envitus) || true',
            'docker image rmi $(docker images "envitus" -q | uniq) || true',
            'docker load --input envitus.tar.gz',
            'docker run -d --name envitus --network host envitus'
        ].join('&&'))
    });

    shipit.blTask('deployDocker', () => {
        shipit.start("deploy:fetch","buildDockerImgZip", "deploy:update", "deploy:publish", "remoteUpDocker", "deploy:clean");
    })
}
