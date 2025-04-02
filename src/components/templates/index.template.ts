/**
 * Component Directory Index Template
 * 
 * This file serves as a template for component directory index files.
 * It demonstrates how to properly export components for clean imports.
 * 
 * Example usage:
 * import { Button, ButtonGroup } from '@/components/ui/button'
 */

// Export the main component
export { ComponentName } from './component-name'

// Export component types
export type { ComponentNameProps } from './component-name'

// Export any related subcomponents
export { ComponentName as Root } from './component-name'
export { ComponentNameItem } from './component-name-item'
export { ComponentNameGroup } from './component-name-group'

// For compound components, you can also export a namespace
// This allows for ComponentName.Item syntax
export { ComponentName, ComponentNameContent, ComponentNameTrigger } from './component-name' 