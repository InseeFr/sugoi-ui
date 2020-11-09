#!/bin/sh
cat <<EOF > /usr/share/nginx/html/keycloak.json
{
	"realm": "$KEYCLOAK_REALM",
	"auth-server-url": "$KEYCLOAK_URL",
	"ssl-required": "none",
	"resource": "$KEYCLOAK_CLIENT",
	"public-client": true,
	"confidential-port": 0
}
EOF

cat <<EOF > /usr/share/nginx/html/configuration.json
{
	"api": "${API_URL_CI}"
}
EOF

exec "$@"
