# Open Alpha Arena

<img width="3840" height="1498" alt="image" src="https://github.com/user-attachments/assets/dac4b5d1-3da7-4b54-97e5-cef226d99547" />

<img width="2882" height="1792" alt="image" src="https://github.com/user-attachments/assets/66a5283b-3761-4992-82d1-8cd01f4d518d" />

这是一个受[nof1 Alpha Arena](https://nof1.ai)启发的项目，您可以在加密货币市场设置AI交易机器人。

已完成：
- 模拟交易
- OpenAI兼容API
- 杠杆交易
- CCXT行情数据

待办：
- 实盘交易

## 星标历史

<a href="https://www.star-history.com/#etrobot/open-alpha-arena&type=date&legend=top-left">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=etrobot/open-alpha-arena&type=date&theme=dark&legend=top-left" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=etrobot/open-alpha-arena&type=date&legend=top-left" />
   <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=etrobot/open-alpha-arena&type=date&legend=top-left" />
 </picture>
</a>

## 开始使用

### 先决条件
- Node.js 18+ 和 pnpm
- Python 3.10+ 和 uv

### 安装
```bash
# 安装JS依赖并同步Python环境
pnpm run install:all
```

### 开发
默认情况下，工作区脚本启动：
- 后端服务在端口 5611
- 前端服务在端口 5621

启动两个开发服务器：
```bash
pnpm run dev
```
打开：
- 前端: http://localhost:5621
- 后端WebSocket: ws://localhost:5611/ws

重要提示：前端源码目前配置为端口5621。要使用工作区默认设置(5611)，请更新frontend/app/main.tsx中的以下内容：
- WebSocket URL: ws://localhost:5611/ws
- API_BASE: http://127.0.0.1:5611

或者，在端口5621上运行后端：
```bash
# 从项目根目录
cd backend
uv sync
uv run uvicorn main:app --reload --port 5621 --host 0.0.0.0
```

### 构建
```bash
# 构建前端；后端没有专门的构建步骤
pnpm run build
```
前端由Vite生成静态资源。后端是一个标准的FastAPI应用程序，可以使用Uvicorn或任何ASGI服务器运行。

## 许可证
MIT