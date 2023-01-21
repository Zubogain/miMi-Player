package main

import (
	"context"
	"fmt"

	"github.com/Zubogain/miMi-player/player"
	"github.com/wailsapp/wails/v2/pkg/runtime"
)

// App struct
type App struct {
	ctx    context.Context
	Player *player.Player
}

// NewApp creates a new App application struct
func NewApp(player *player.Player) *App {
	return &App{Player: player}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
	a.Player.Startup(ctx)
}

func (a *App) OpenMessageDialog() {
	_, err := runtime.MessageDialog(a.ctx, runtime.MessageDialogOptions{
		Title:   "It's your turn!",
		Message: "Select a number",
		Buttons: []string{"one", "two", "three", "four"},
	})

	if err != nil {
		fmt.Println(err)
	}
}
