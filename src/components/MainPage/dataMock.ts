export interface IDataMock{
    address: string,
    position: {
        lat: number,
        lng: number
    }
    energyType: 'windmill' | 'solarPanel',
    quantity: number,
    energyNeeded: number,
    energyMade: number,
    energyPerHour: number
}

// 0.32 kW h - (Average) Mock solar panel energy production per hour per m^2 
// 2000 kW h - (Average) Mock windmill energy production per hour per one windmill
// 887 kW h -  (Average USA) Mock household energy consumption per month

export const dataMock: IDataMock[] = [
    {
      address: 'ul. Puławska',
      position: {
        lat: 52.21235305688391, 
        lng: 21.02120920417161
      },
      energyType: 'solarPanel',
      quantity:5,
      energyNeeded: 920,
      energyMade: 735,
      energyPerHour: 1.6
    },
    {
      address: 'al. Ludwika Waryńskiego',
      position: {
        lat: 52.211240063996044, 
        lng: 21.02013315087738
      },
      energyType: 'windmill',
      quantity:5,
      energyNeeded: 1000,
      energyMade: 600,
      energyPerHour: 10000 

    },
    {
      address: 'ul. Goworka',
      position: {
        lat: 52.211246638111625, 
        lng: 21.02167810326996
      },
      energyType: 'windmill',
      quantity: 7,
      energyNeeded: 709,
      energyMade: 200,
      energyPerHour: 14000 // 2,000 * 7
    },
    {
      address: 'ul. Klonowa',
      position: {
        lat: 52.21322980032158, 
        lng: 21.02230559682815
      },
      energyType: 'solarPanel',
      quantity: 3,
      energyNeeded: 800,
      energyMade: 800,
      energyPerHour: 0.96 // 0.32 * 3
    }
  ]
//

