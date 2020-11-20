#!/bin/sh

cat <<EOF > /usr/share/nginx/html/configuration.json
{
	"api": "${API_URL_CI}",
	"adminName": "${ADMIN_ROLE}",
	"writerRegexName": "${WRITER_PATTERN_ROLE}",
	"readerRegexName": "${READER_PATTERN_ROLE}",
	"auth": {
		"client_id": "${AUTH_CLIENT_ID}",
		"redirect_uri": "${URL_HOSTNAME}/authentication/callback",
		"response_type": "code",
		"post_logout_redirect_uri": "${URL_HOSTNAME}/",
		"scope": "openid profile email",
		"authority": "${AUTH_URL_AUTHORITY}",
		"silent_redirect_uri": "${URL_HOSTNAME}/authentication/silent_callback",
		"automaticSilentRenew": true,
		"loadUserInfo": true
	}
}
EOF

exec "$@"
