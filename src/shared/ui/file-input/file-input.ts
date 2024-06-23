import { Block, BlockProps } from '@/shared/lib'
import styles from './file-input.module.css'

const template = `<input type="file" accept="image/*" id="fileInput" class="${styles.input}" />`

interface FileInputProps extends BlockProps {
  onChange: (file: File) => void
}

export class FileInput extends Block<FileInputProps> {
  constructor(props: FileInputProps) {
    super({
      ...props,
      events: {
        change: (event) => this.onChange(event),
      },
    })
  }

  onChange(event: Event) {
    const input = event.target as HTMLInputElement
    const file = input.files?.[0]
    if (file) {
      this.props.onChange(file)
    }
  }

  render() {
    return this.compile(template, this.props)
  }
}
