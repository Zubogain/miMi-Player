package player

import (
	"context"
	"fmt"
	"log"
	"path/filepath"
	"time"

	"github.com/Zubogain/miMi-player/audio"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

// App struct
type Player struct {
	ctx        context.Context
	audioPanel audio.AudioPanel
}

// NewApp creates a new App application struct
func NewPlayer() *Player {
	// events.
	return &Player{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (p *Player) Startup(ctx context.Context) {
	p.ctx = ctx
}

func (p *Player) eventTrackPosition() {
	go func() {
		for {
			if p.audioPanel.Ctrl.Paused {
				return
			}
			trackPositionMs := p.audioPanel.SampleRate.D(p.audioPanel.Streamer.Position()).Milliseconds()
			runtime.EventsEmit(p.ctx, "player:track:position", trackPositionMs)
			time.Sleep(1000 / 60 * time.Millisecond)
		}
	}()
}

func (p *Player) eventTrackDuration() {
	trackDurationMs := p.audioPanel.SampleRate.D(p.audioPanel.Streamer.Len()).Milliseconds()
	runtime.EventsEmit(p.ctx, "player:track:duration", trackDurationMs)
}

func (p *Player) PlayerChangeVolume(precentage float64) {
	fmt.Println("PlayerChangeVolume")
	p.audioPanel.ChangeVolume(precentage)
}

func (p *Player) PlayerToggleMute(toggle bool) {
	fmt.Println("PlayerToggleMute")
	p.audioPanel.ToggleMute(toggle)
}

func (p *Player) PlayerPause() {
	fmt.Println("PlayerPause")
	p.audioPanel.Pause()
}

func (p *Player) PlayerResume() {
	fmt.Println("PlayerResume")
	p.eventTrackPosition()
	p.audioPanel.Resume()
}

func (p *Player) OpenFile(curTrackPath string) string {
	var err error
	var filePath string
	var ext string

	filePath, err = runtime.OpenFileDialog(p.ctx, runtime.OpenDialogOptions{Filters: []runtime.FileFilter{
		{
			DisplayName: "Audio (*.wav;*.mp3;*.ogg;*.flac)",
			Pattern:     "*.wav;*.mp3;*.ogg;*.flac",
		},
	}})
	if err != nil {
		log.Fatal(err)
		return ""
	}

	if filePath == curTrackPath {
		return ""
	}

	ext = filepath.Ext(filePath)

	p.audioPanel.Close()

	go p.audioPanel.New(filePath, ext, p.eventTrackDuration)

	return filePath
}
