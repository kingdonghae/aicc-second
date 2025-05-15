import { Image } from '@tiptap/extension-image';

export const AlignedImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      align: {
        default: 'center',
        parseHTML: element => element.getAttribute('data-align') || 'center',
        renderHTML: attributes => {
          return {
            'data-align': attributes.align,
            style: `display: block; margin: ${
              attributes.align === 'left' ? '1rem auto 1rem 0' :
              attributes.align === 'right' ? '1rem 0 1rem auto' :
              '1rem auto'
            }; max-width: 100%; height: auto;`,
          };
        },
      },
    };
  },
});
