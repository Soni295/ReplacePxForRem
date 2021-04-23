const text = 'border: 10px;'


console.log(text.replace(/\s.*px/, L => 
  ' ' + L.replace(/px/, '')/ 16 +'rem'
))
