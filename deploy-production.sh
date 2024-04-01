#/bin/bash
#upload files npm run deploy:prod
aws --profile fpossetto s3 cp ./dist s3://www.fiktionmaps.com --recursive --acl public-read --region us-east-2 --exclude "" --include ".js" --include "..js"
aws --profile fpossetto s3 cp ./dist s3://www.fiktionmaps.com --recursive --acl public-read --region us-east-2 --exclude ".js" --exclude ".*.js"
aws --profile fpossetto cloudfront create-invalidation --distribution-id E3COPAL5XU2AB7 --path "/*"