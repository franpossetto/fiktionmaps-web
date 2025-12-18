#/bin/bash
# Upload files npm run deploy:prod
# To avoid error we push files in two parts: first JS, then the rest.

# Upload every .js file with the correct content-type
find ./dist -name "*.js" | while read file; do
  aws --profile fpossetto s3 cp "$file" "s3://www.fiktionmaps.com/${file#./dist/}" --acl public-read --region us-east-2 --content-type application/javascript
done

# upload the rest (without .js)
aws --profile fpossetto s3 cp ./dist s3://www.fiktionmaps.com --recursive --acl public-read --region us-east-2 --exclude "*.js"

# Invalidate cache
aws --profile fpossetto cloudfront create-invalidation --distribution-id E3COPAL5XU2AB7 --path "/*"
