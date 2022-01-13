my-shiny-api-tests

BACKEND:

docker pull ibnxotabu4/swagger-api-petstore
docker run -d -e SWAGGER_HOST=http://petstore.swagger.io \
-e SWAGGER_URL=http://localhost \
-e SWAGGER_BASE_PATH=/v2 -p 80:8080 ibnxotabu4/swagger-api-petstore