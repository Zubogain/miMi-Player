package main

import (
	"embed"

	"github.com/Zubogain/miMi-player/bluetooth"
	"github.com/Zubogain/miMi-player/player"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
	"github.com/wailsapp/wails/v2/pkg/options/windows"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {
	BT := bluetooth.NewBT()
	Player := player.NewPlayer()

	// Create an instance of the app structure
	app := NewApp(Player)

	// Create application with options
	err := wails.Run(&options.App{
		Title:         "miMi Player",
		Width:         480,
		Height:        480, // 120
		DisableResize: true,
		Frameless:     true,
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		BackgroundColour: &options.RGBA{R: 255, G: 0, B: 0, A: 128},
		OnStartup:        app.startup,
		Windows: &windows.Options{
			WebviewIsTransparent: true,
			WindowIsTranslucent:  true,
		},
		Bind: []interface{}{
			app,
			Player,
			BT,
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}
}
