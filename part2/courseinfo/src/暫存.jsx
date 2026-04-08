const sumWithInitial = courses.parts.reduce((accumulator, currentValue) => {
    console.log('現在', accumulator, '下一個', currentValue)
    return (accumulator + currentValue.exercises)
  }, initialValue)

<p><strong>Total exercises: {sumWithInitial}</strong></p>