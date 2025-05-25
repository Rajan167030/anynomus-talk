# Anonymous Talk

A real-time anonymous chat application similar to Omegle, where users can chat with random strangers while maintaining privacy and safety.

## Features

- 🔐 **User Authentication**: Email, phone, and social login support
- 👥 **Gender Selection & Filtering**: Choose your gender and preferred chat partners
- 💬 **Anonymous Chat**: Random 1-on-1 text conversations
- ⚡ **Real-time Communication**: Instant messaging with Socket.IO
- 🛡️ **Safety Features**: Report, block, and content moderation
- 🎯 **Interest Matching**: Optional interest-based matching
- 📱 **Responsive Design**: Works on desktop and mobile

## Technology Stack

- **Frontend**: React.js with modern UI components
- **Backend**: Node.js with Express
- **Real-time**: Socket.IO for instant messaging
- **Authentication**: JWT-based authentication
- **Database**: JSON file storage (easily upgradeable to MongoDB/PostgreSQL)
- **Safety**: Built-in profanity filter and reporting system

## Quick Start

1. **Install dependencies**:
   ```bash
   npm run install-all
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Access the application**:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## Project Structure

```
anonymous-talk/
├── client/          # React.js frontend
├── server/          # Node.js backend
├── shared/          # Shared utilities and types
└── docs/           # Documentation
```

## Safety & Moderation

- Automatic profanity filtering
- User reporting system
- Admin moderation panel
- Rate limiting to prevent spam
- Gender verification options

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License

---

**Made with ❤️ by Rajan Jha**  
GitHub: [@Rajan16703](https://github.com/Rajan16703)

© 2024 Anonymous Talk. All rights reserved.