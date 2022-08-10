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

                sh "tag=${git rev-parse --short HEAD}"

                if (env.BRANCH_NAME == "stage")
                
                { 
                sh "pwd && ls -lah"
                sh "docker build -t addekrisna/cilist_backend:stage-$tag -f backend/Dockerfile backend/."
                sh "docker build -t addekrisna/cilist_frontend:stage-$tag -f frontend/Dockerfile frontend/."

                sh "docker push addekrisna/cilist_backend:stage-$tag"
                sh "docker push addekrisna/cilist_frontend:stage-$tag"

                }else{ 

                sh "pwd && ls -lah"
                sh "docker build -t addekrisna/cilist_backend:prod-$tag -f backend/Dockerfile backend/."
                sh "docker build -t addekrisna/cilist_frontend:prod-$tag -f frontend/Dockerfile frontend/."

                sh "docker push addekrisna/cilist_backend:prod-$tag"
                sh "docker push addekrisna/cilist_frontend:prod-$tag"
                
                }
                
                }
                
              }
            }
        stage('Deploy') {
          agent { label "agent1" }
            steps {
              //
                script { echo "Testing Deploy Lagi" 
                
                sh "tag=${git rev-parse --short HEAD}"

                if (env.BRANCH_NAME == "stage")
                
                { 

                sh "kubectl -n stage set image deployment/web-api cilist-backend=addekrisna/cilist_backend:stage-$tag"
                sh "kubectl -n stage set image deployment/web-front cilist-frontend=addekrisna/cilist_frontend:stage-$tag"
                sh "docker image rmi addekrisna/cilist_backend:stage-$tag"
                sh "docker image rmi addekrisna/cilist_frontend:stage-$tag"
                }else{ 

                sh "kubectl -n production set image deployment/web-api cilist-backend=addekrisna/cilist_backend:prod-$tag"
                sh "kubectl -n production set image deployment/web-front cilist-frontend=addekrisna/cilist_frontend:prod-$tag"
                sh "docker image rmi addekrisna/cilist_backend:prod-$tag"
                sh "docker image rmi addekrisna/cilist_frontend:prod-$tag"
                }

                }
            }
          }
        }
      }