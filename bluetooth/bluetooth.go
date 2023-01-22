package bluetooth

import (
	"context"
	"sync"
	"time"

	"github.com/zzl/go-com/com"
	"github.com/zzl/go-winrtapi/winrt"
)

type bluetoothDevice struct {
	Name string
	Id   string
}

type Bluetooth struct {
	ctx context.Context

	devices []bluetoothDevice
	device  bluetoothDevice
}

func awaitDeviceInformationFindAll(iAsyncOperation *winrt.IAsyncOperation[*winrt.IVectorView[*winrt.IDeviceInformation]]) *winrt.IVectorView[*winrt.IDeviceInformation] {
	var wg sync.WaitGroup

	wg.Add(1)
	go func() {
		done := false

		for {
			if done {
				return
			}
			iAsyncOperation.Put_Completed(func(asyncOperation *winrt.IAsyncOperation[*winrt.IVectorView[*winrt.IDeviceInformation]], asyncStatus winrt.AsyncStatus) com.Error {
				if asyncStatus != winrt.AsyncStatus_Completed {
					return com.FAIL
				}

				defer wg.Done()
				done = true
				return com.OK
			})
			// FIX для корректного начала и завершения рутины
			time.Sleep(100 * time.Millisecond)
		}
	}()

	wg.Wait()

	return iAsyncOperation.GetResults()
}

func (BT *Bluetooth) startup(ctx context.Context) {
	BT.ctx = ctx
}

func (BT *Bluetooth) connectToDeviceAsync(device bluetoothDevice, wg *sync.WaitGroup) {
	winrt.InitializeMt()

	iAudioPlayback := winrt.NewIAudioPlaybackConnectionStatics()
	connection := iAudioPlayback.TryCreateFromId(device.Id)

	connection.Start()

	connectionOpenResult := connection.Open()
	connectionOpenResultStatus := connectionOpenResult.Get_Status()

	if connectionOpenResultStatus != winrt.AudioPlaybackConnectionOpenResultStatus_Success {
		wg.Done()
		return
	}

	BT.device = device

	wg.Done()
	defer winrt.Uninitialize()
	select {}
}

func (BT *Bluetooth) ConnectToDevice(deviceId string) bool {
	var wg sync.WaitGroup
	var device bluetoothDevice

	for _, v := range BT.devices {
		if v.Id == deviceId {
			device = v
			break
		}
	}

	devicesLen := uint32(len(BT.devices))

	// empty list of devices
	if devicesLen == 0 {
		return false
	}

	// if device.Id is empty, device not found
	if device.Id == "" {
		return false
	}

	// the device is already connected
	if BT.device.Id == device.Id {
		return false
	}

	wg.Add(1)
	go BT.connectToDeviceAsync(device, &wg)
	wg.Wait()

	return true
}

func (BT *Bluetooth) GetDeviceList() []bluetoothDevice {
	var deviceList []bluetoothDevice
	winrt.InitializeMt()

	iAudioPlayback := winrt.NewIAudioPlaybackConnectionStatics()

	iDeviceInformation := winrt.NewIDeviceInformationStatics()

	iAsyncOperation := iDeviceInformation.FindAllAsyncAqsFilter(iAudioPlayback.GetDeviceSelector())

	devices := awaitDeviceInformationFindAll(iAsyncOperation)

	count := devices.Get_Size()
	for n := uint32(0); n < count; n++ {
		device := devices.GetAt(n)

		// add bt devices to struct instance for other select
		deviceList = append(deviceList, bluetoothDevice{Name: device.Get_Name(), Id: device.Get_Id()})
	}

	BT.devices = deviceList

	winrt.Uninitialize()

	return BT.devices
}

// Getter: Get connected device
func (BT *Bluetooth) GetConnectedDevice() bluetoothDevice {
	return BT.device
}

// NewBT creates a new BT instance struct
func NewBT() *Bluetooth {
	return &Bluetooth{ctx: context.Background()}
}
