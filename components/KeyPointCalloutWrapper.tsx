import Admonition from './Admonition/Admonition'

export default function KeyPointCalloutWrapper(props: any) {
  const title = props.title || 'Note'
  const type = props.type || 'info'
  return (
    <Admonition title={title} type={type} {...props}>
      {props.children}
    </Admonition>
  )
}
