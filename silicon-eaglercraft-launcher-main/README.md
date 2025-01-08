# Silicon Eaglercraft Launcher 🚀

🎮 Play Minecraft anywhere - School, Work, No Download Required! Includes every Eaglercraft version (1.8.8, 1.5.2, Indev) with instant stealth features (` to close, about:blank cloak). Just download, click index.html, and play! Beautiful graphics and custom resource packs included!

## 🌟 Features

- **Multi-Version Support**
  - Minecraft 1.8.8
  - Minecraft 1.5.2
  - Minecraft Indev
  - And more!

- **Stealth Features**
  - Quick exit with ` key
  - Instant about:blank cloaking
  - No shell traces
  - Completely self-contained

- **Easy Setup**
  1. Download the entire ZIP file
  2. Extract to your preferred location
  3. Open `index.html` in your browser
  4. Enjoy your personal gaming website!

- **Enhanced Graphics**
  - Beautiful and lucid graphics
  - Built-in resource packs
  - Custom texture support

## 🎮 Getting Started

1. **Installation**
   - Download the complete ZIP package
   - Extract all contents to a folder
   - No additional setup required!

2. **Launch**
   - Open `index.html` in any web browser
   - Select your preferred Minecraft version
   - Start playing!

3. **Resource Packs**
   - Access built-in texture packs through the in-game menu
   - Follow in-game instructions to apply or change resource packs

## ⚡ Quick Controls

- Press ` (backtick) for emergency tab closure
- Use about:blank feature for instant cloaking
- No traces left in browser history

## 💡 Tips

- Keep the folder structure intact for proper functionality
- Works on most modern browsers
- Perfect for portable gaming setup
- No installation or server required

## ⚠️ Note

This is an offline-capable launcher. All necessary game files are included in the package.

## 🎨 Customization

Follow the in-game instructions to:
- Change resource packs
- Adjust graphics settings
- Customize controls

## 🔒 Privacy Features

- No server connections required
- No shell startup traces
- Clean browser history
- Instant exit capabilities

## 🚀 Deployment on Koyeb

1. Fork this repository
2. Create a new Koyeb account at https://app.koyeb.com/
3. In Koyeb, create a new app and select "GitHub"
4. Connect your GitHub account and select this repository
5. Configure your deployment:
   - **IMPORTANT**: Select "Docker" as the build method (not Buildpack)
   - Port: 8081
   - Health check path: /health
6. Click "Deploy"

Your launcher will be available at your Koyeb domain!

Note: Make sure to select "Docker" as the build method, not "Buildpack", for successful deployment.

## 🐳 Docker Development

```bash
# Build the image
docker build -t silicon-launcher .

# Run locally
docker run -p 8081:8081 silicon-launcher
```

Visit `http://localhost:8081` to access the launcher.

---
Enjoy your portable Minecraft experience! 🎮✨
