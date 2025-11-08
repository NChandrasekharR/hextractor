// Show the plugin UI
figma.showUI(__html__, { width: 800, height: 600 });

// Listen for messages from the UI
figma.ui.onmessage = async (msg) => {
  if (msg.type === 'save-colors') {
    const colors = msg.colors; // Array of {hex, name} objects
    let createdCount = 0;

    for (let i = 0; i < colors.length; i++) {
      const colorData = colors[i];
      const hex = colorData.hex;
      const name = colorData.name;
      const rgb = hexToRgb(hex);
      
      if (!rgb) continue;

      // Convert RGB to Figma's color format (0-1 range)
      const figmaColor = {
        r: rgb.r / 255,
        g: rgb.g / 255,
        b: rgb.b / 255
      };

      // Use the custom name from UI
      const styleName = name;

      // Check if a style with this name already exists
      let existingStyle = figma.getLocalPaintStyles().find(
        style => style.name === styleName
      );

      if (existingStyle) {
        // Update existing style
        existingStyle.paints = [{
          type: 'SOLID',
          color: figmaColor
        }];
      } else {
        // Create new paint style
        const paintStyle = figma.createPaintStyle();
        paintStyle.name = styleName;
        paintStyle.paints = [{
          type: 'SOLID',
          color: figmaColor
        }];
      }

      createdCount++;
    }

    // Notify the UI that styles were created
    figma.ui.postMessage({
      type: 'colors-saved',
      count: createdCount
    });
  }
};

// Helper function to convert hex to RGB
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}
