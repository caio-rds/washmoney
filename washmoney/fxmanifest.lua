fx_version "bodacious"
game "gta5"

ui_page "nui/index.html"

client_scripts {
	"@vrp/lib/utils.lua",
	"client/client.lua"
}

server_scripts {
	"@vrp/lib/utils.lua",
	"server/server.lua"
}

files {
	"nui/*"
}