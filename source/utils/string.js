function kebabToCamel(str) {
    const arr = str.split('-');
    let camelStr = '';
    
    for (let i = 0; i < arr.length; i++) {
      const word = arr[i];
      camelStr += i === 0 ? word : word[0].toUpperCase() + word.slice(1); 
    }
    return camelStr;
  }