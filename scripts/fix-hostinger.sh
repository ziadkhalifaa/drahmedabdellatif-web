#!/bin/bash
HTACCESS='/home/u614350323/domains/drahmedabdellatif.com/public_html/.htaccess'

echo 'PassengerAppRoot /home/u614350323/domains/drahmedabdellatif.com/nodejs' > "$HTACCESS"
echo 'PassengerAppType node' >> "$HTACCESS"
echo 'PassengerNodejs /opt/alt/alt-nodejs20/root/bin/node' >> "$HTACCESS"
echo 'PassengerStartupFile server.js' >> "$HTACCESS"
echo 'PassengerBaseURI /' >> "$HTACCESS"
echo 'PassengerRestartDir /home/u614350323/domains/drahmedabdellatif.com/nodejs/tmp' >> "$HTACCESS"
echo 'SetEnv UV_THREADPOOL_SIZE 1' >> "$HTACCESS"
echo 'SetEnv LSNODE_CONSOLE_LOG console.log' >> "$HTACCESS"
echo 'RewriteRule ^\.builds - [F,L]' >> "$HTACCESS"

echo "=== .htaccess written ==="
cat "$HTACCESS"

echo ""
echo "=== Triggering Passenger restart ==="
touch /home/u614350323/domains/drahmedabdellatif.com/nodejs/tmp/restart.txt
echo "restart.txt touched at: $(date)"

echo ""
echo "=== Done! Site should restart in a few seconds ==="
