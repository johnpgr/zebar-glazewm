/**
 * Describes a system tray icon's properties and data.
 */
export interface SystrayIcon {
    /**
     * The unique identifier for the icon.
     */
    id: string

    /**
     * Icon image represented as a PNG byte array.
     */
    iconBytes: number[]

    /**
     * Icon image as a PNG blob object.
     */
    iconBlob: Blob

    /**
     * A hash of the icon image, used to detect changes.
     */
    iconHash: string

    /**
     * A URL for the icon image that can be used directly in `<img>` elements.
     */
    iconUrl: string

    /**
     * The text that appears when a user hovers over the icon.
     */
    tooltip: string
}
