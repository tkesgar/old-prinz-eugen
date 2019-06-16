import marked from 'marked'
import DOMPurify from 'dompurify'

const noop = i => i
const remove = () => ''

const renderer = new marked.Renderer()

renderer.code = noop
renderer.blockquote = noop
renderer.checkbox = noop
renderer.html = remove
renderer.hr = remove

renderer.codespan = noop
renderer.br = remove
renderer.image = remove
renderer.link = (href, title, text) => text

export default function renderMarkdown (markdown) {
  return marked(markdown, {
    renderer,
    sanitize: true,
    sanitizer: DOMPurify.sanitize
  })
}
