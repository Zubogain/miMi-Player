package audio

import (
	"fmt"
	"log"
	"os"
	"time"

	"github.com/faiface/beep"
	"github.com/faiface/beep/effects"
	"github.com/faiface/beep/flac"
	"github.com/faiface/beep/mp3"
	"github.com/faiface/beep/speaker"
	"github.com/faiface/beep/vorbis"
	"github.com/faiface/beep/wav"
)

type AudioPanel struct {
	SampleRate beep.SampleRate
	Streamer   beep.StreamSeeker
	Ctrl       *beep.Ctrl
	Resampler  *beep.Resampler
	Volume     *effects.Volume
}

func (ap *AudioPanel) Play() {
	speaker.Clear()
	done := make(chan bool)

	speaker.Play(ap.Volume)

	done <- true

	select {}
}

func (ap *AudioPanel) Resume() {
	ap.Ctrl.Paused = false

}

func (ap *AudioPanel) Pause() {
	ap.Ctrl.Paused = true
}

func (ap *AudioPanel) ChangeVolume(precentage float64) {
	speaker.Lock()
	ap.Volume.Volume = precentage
	speaker.Unlock()
	fmt.Println("ChangeVolume:", ap.Volume.Volume)
}

func (ap *AudioPanel) ToggleMute(toggle bool) {
	ap.Volume.Silent = toggle
}

func (ap *AudioPanel) Close() {
	speaker.Clear()
}

func (ap *AudioPanel) new() {
	ap.Ctrl = &beep.Ctrl{Streamer: beep.Loop(-2, ap.Streamer), Paused: true}
	ap.Resampler = beep.ResampleRatio(4, 0.5, ap.Ctrl)
	ap.Volume = &effects.Volume{Streamer: ap.Resampler, Base: 2, Volume: 0, Silent: false}
}

func (ap *AudioPanel) newWav(file *os.File, cb func()) {
	streamer, format, err := wav.Decode(file)
	if err != nil {
		log.Fatal(err)
	}
	defer streamer.Close()

	speaker.Init(format.SampleRate, format.SampleRate.N(time.Second/30))

	ap.SampleRate = format.SampleRate
	ap.Streamer = streamer

	ap.new()

	sr := format.SampleRate * 2
	speaker.Init(sr, sr.N(time.Second/10))

	cb()

	defer ap.Play()
}

func (ap *AudioPanel) newMp3(file *os.File, cb func()) {
	streamer, format, err := mp3.Decode(file)
	if err != nil {
		log.Fatal(err)
	}
	defer streamer.Close()

	speaker.Init(format.SampleRate, format.SampleRate.N(time.Second/30))

	ap.SampleRate = format.SampleRate
	ap.Streamer = streamer

	ap.new()

	sr := format.SampleRate * 2
	speaker.Init(sr, sr.N(time.Second/10))

	cb()

	defer ap.Play()
}

func (ap *AudioPanel) newFlac(file *os.File, cb func()) {
	streamer, format, err := flac.Decode(file)
	if err != nil {
		log.Fatal(err)
	}
	defer streamer.Close()

	speaker.Init(format.SampleRate, format.SampleRate.N(time.Second/30))

	ap.SampleRate = format.SampleRate
	ap.Streamer = streamer

	ap.new()

	sr := format.SampleRate * 2
	speaker.Init(sr, sr.N(time.Second/10))

	cb()

	defer ap.Play()
}

func (ap *AudioPanel) newVorbis(file *os.File, cb func()) {
	streamer, format, err := vorbis.Decode(file)
	if err != nil {
		log.Fatal(err)
	}
	defer streamer.Close()

	speaker.Init(format.SampleRate, format.SampleRate.N(time.Second/30))

	ap.SampleRate = format.SampleRate
	ap.Streamer = streamer

	ap.new()

	sr := format.SampleRate * 2
	speaker.Init(sr, sr.N(time.Second/10))

	cb()

	defer ap.Play()
}

func (ap *AudioPanel) New(filename string, ext string, cb func()) bool {
	file, err := os.Open(filename)
	if err != nil {
		log.Println(err)
		return false
	}

	switch ext {
	case ".mp3":
		ap.newMp3(file, cb)
	case ".wav":
		ap.newWav(file, cb)
	case ".flac":
		ap.newFlac(file, cb)
	case ".ogg":
		ap.newVorbis(file, cb)
	default:
		return false
	}

	return true
}
