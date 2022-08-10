properties([pipelineTriggers([githubPush()])]) 
pipeline {
    agent any
    stages {
        stage('Test') {
          agent { label "agent1" }
            steps {
              //
                script { echo "Test" 
                def scannerHome = tool 'sonarscanner1' ;
	              withSonarQubeEnv('sonarserver1') {
	              sh "${scannerHome}/bin/sonar-scanner"
	                }
                }
              }
            }
        stage('Build') {
          agent { label "agent1" }
            steps {
              //
                script { echo "Build"
                if (env.BRANCH_NAME == "stage")
                
                { 
                sh "pwd && ls -lah"
                sh "docker build -t addekrisna/cilist_backend:stage-$BUILD_NUMBER -f backend/Dockerfile backend/."
                sh "docker build -t addekrisna/cilist_frontend:stage-$BUILD_NUMBER -f frontend/Dockerfile frontend/."

                sh "docker push addekrisna/cilist_backend:stage-$BUILD_NUMBER"
                sh "docker push addekrisna/cilist_frontend:stage-$BUILD_NUMBER"

                }else{ 

                sh "pwd && ls -lah"
                sh "docker build -t addekrisna/cilist_backend:prod-$BUILD_NUMBER -f backend/Dockerfile backend/."
                sh "docker build -t addekrisna/cilist_frontend:prod-$BUILD_NUMBER -f frontend/Dockerfile frontend/."

                sh "docker push addekrisna/cilist_backend:prod-$BUILD_NUMBER"
                sh "docker push addekrisna/cilist_frontend:prod-$BUILD_NUMBER"
                
                }
                
                }
                
              }
            }
        stage('Deploy') {
          agent { label "agent1" }
            steps {
              //
                script { echo "Testing Deploy Lagi" 
                
                if (env.BRANCH_NAME == "stage")
                
                { 
                sh "kubectl -n stage set image deployment/web-api cilist-backend=addekrisna/cilist_backend:stage-$BUILD_NUMBER"
                sh "kubectl -n stage set image deployment/web-front cilist-frontend=addekrisna/cilist_frontend:stage-$BUILD_NUMBER"
                sh "docker image rmi addekrisna/cilist_backend:stage-$BUILD_NUMBER"
                sh "docker image rmi addekrisna/cilist_frontend:stage-$BUILD_NUMBER"
                }else{ 

                sh "kubectl -n production set image deployment/web-api cilist-backend=addekrisna/cilist_backend:prod-$BUILD_NUMBER"
                sh "kubectl -n production set image deployment/web-front cilist-frontend=addekrisna/cilist_frontend:prod-$BUILD_NUMBER"
                sh "docker image rmi addekrisna/cilist_backend:prod-$BUILD_NUMBER"
                sh "docker image rmi addekrisna/cilist_frontend:prod-$BUILD_NUMBER"
                }

                }
            }
          }
        }
      }