echo "Downloading bootstrap and jquery to /public/libs/"
mkdir -p ./public/libs/bootstrap/4.0.0-beta.3/css/
curl https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.3/css/bootstrap.min.css > ./public/libs/bootstrap/4.0.0-beta.3/css/bootstrap.min.css
mkdir -p ./public/libs/bootstrap/4.0.0-beta.3/js/
curl https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.3/js/bootstrap.min.js > ./public/libs/bootstrap/4.0.0-beta.3/js/bootstrap.min.js
curl https://code.jquery.com/jquery-3.2.1.min.js > ./public/libs/jquery-3.2.1.min.js
