import pickr from '../../../static/pickr-esm2022.js'
 
export const createPickr=(el, defaultColor, onChange)=> {
    const pickr = Pickr.create({
      el,
      theme: 'classic',
      default: defaultColor,
      useAsButton: true,
      inline: false,
      components: {
        preview: false,
        opacity: true,
        hue: true,
        interaction: {
          hex: true,
          rgba: true,
          hsla: true,
          hsva: true,
          cmyk: true,
          input: true,
          clear: true,
          save: true
        }
      }
    });
}