
import Button from "../components/Button/Button"

export default {
    title: "Example/Button",
    component: Button,
}


const Template = args => { return <Button {...args} />}

export const Primary = () => Template.bind({});

Primary.args = {
    children: "Test",
    type: Button.TYPES.PRIMARY,
}

export const Secondary = Template.bind({});

Secondary.args = {
  children: "Secondary Button",
  type: Button.TYPES.SECONDARY,
}