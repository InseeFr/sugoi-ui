#!/bin/sh
cat <<EOF > etc/nginx/conf.d/html/keycloak.json
{
	"realm": "$KEYCLOAK_REALM",
	"auth-server-url": "$KEYCLOAK_URL",
	"ssl-required": "none",
	"resource": "$KEYCLOAK_CLIENT",
	"public-client": true,
	"confidential-port": 0
}
EOF

cat <<EOF > etc/nginx/conf.d/html/configuration.json
{
	"api": "${API_URL_CI}"
}
EOF

exec "$@"