interface IDataMock{
    address: string,
    position: {
        lat: number,
        lng: number
    }
    energyNeeded: number,
    energyMade: number
}

export const dataMock: IDataMock[] = [
    {
      address: 'ul. Puławska',
      position: {
        lat: 52.21235305688391, 
        lng: 21.02120920417161
      },
      energyNeeded: 60,
      energyMade: 60,
    },
    {
      address: 'al. Ludwika Waryńskiego',
      position: {
        lat: 52.211240063996044, 
        lng: 21.02013315087738
      },
      energyNeeded: 30,
      energyMade: 60,
    },
    {
      address: 'ul. Goworka',
      position: {
        lat: 52.211246638111625, 
        lng: 21.02167810326996
      },
      energyNeeded: 23,
      energyMade: 10,
    }
  ]