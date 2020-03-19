export enum DsWebsocket {
  connect = '[Dualshock] Connect',
  disconnect = '[Dualshock] Disconnect',
  stateChange = '[Dualshock] State Changed'
}

export enum NrfWebsocket {
  getConfig = '[Nrf] Get Config',
  setConfig = '[Nrf] Set Config',
  startTransmission = '[Nrf] Start Transmission',
  stopTransmission = '[Nrf] Stop Transmission',
  getDebugInformation = '[Nrf] Get Debug Information',
  startTest = '[Nrf] Start Test',
  stopTest = '[Nrf] Stop Test'
}
