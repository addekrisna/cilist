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
                sh "docker build -t addekrisna/cilist_backend:stage-${git rev-parse --short HEAD} -f backend/Dockerfile backend/."
                sh "docker build -t addekrisna/cilist_frontend:stage-${git rev-parse --short HEAD} -f frontend/Dockerfile frontend/."

                sh "docker push addekrisna/cilist_backend:stage-${git rev-parse --short HEAD}"
                sh "docker push addekrisna/cilist_frontend:stage-${git rev-parse --short HEAD}"

                }else{ 

                sh "pwd && ls -lah"
                sh "docker build -t addekrisna/cilist_backend:prod-${git rev-parse --short HEAD} -f backend/Dockerfile backend/."
                sh "docker build -t addekrisna/cilist_frontend:prod-${git rev-parse --short HEAD} -f frontend/Dockerfile frontend/."

                sh "docker push addekrisna/cilist_backend:prod-${git rev-parse --short HEAD}"
                sh "docker push addekrisna/cilist_frontend:prod-${git rev-parse --short HEAD}"
                
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

                sh "kubectl -n stage set image deployment/web-api cilist-backend=addekrisna/cilist_backend:stage-${git rev-parse --short HEAD}"
                sh "kubectl -n stage set image deployment/web-front cilist-frontend=addekrisna/cilist_frontend:stage-${git rev-parse --short HEAD}"
                sh "docker image rmi addekrisna/cilist_backend:stage-${git rev-parse --short HEAD}"
                sh "docker image rmi addekrisna/cilist_frontend:stage-${git rev-parse --short HEAD}"
                }else{ 

                sh "kubectl -n production set image deployment/web-api cilist-backend=addekrisna/cilist_backend:prod-${git rev-parse --short HEAD}"
                sh "kubectl -n production set image deployment/web-front cilist-frontend=addekrisna/cilist_frontend:prod-${git rev-parse --short HEAD}"
                sh "docker image rmi addekrisna/cilist_backend:prod-${git rev-parse --short HEAD}"
                sh "docker image rmi addekrisna/cilist_frontend:prod-${git rev-parse --short HEAD}"
                }

                }
            }
          }
        }
      }