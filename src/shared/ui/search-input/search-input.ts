import { Block, BlockProps } from '@/shared/lib/block'
import styles from './search-input.module.css'

const template = `
<div class='${styles.wrapper}'>
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    class='icon ${styles.icon}'
  >
    <circle cx='11' cy='11' r='8' />
    <path d='m21 21-4.3-4.3' />
  </svg>
  <label>
    <input
      placeholder='{{placeholder}}'
      type='text'
      class='${styles.input}'
    />
  </label>
</div>
`

interface SearchInputProps extends BlockProps {
  placeholder: string
}

export class SearchInput extends Block<SearchInputProps> {
  render() {
    return this.compile(template, this.props)
  }
}
