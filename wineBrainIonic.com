server {
  listen 4500;
  server_name localhost;

  expires -1;
  add_header Pragma "no-cache";
  add_header Cache-Control "no-store, no-cache, must-revalidate, pre-check=0";

  root /Users/stenmuchow/Work/wine-brain-ionic/www;
  index index.html index.htm;

  location / {
    try_files $uri $uri/ /index.html =404;
  }

  location /images/ {
  }

}
