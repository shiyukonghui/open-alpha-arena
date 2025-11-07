# 后端结构

该目录包含了 open-alpha-arena 项目的后端代码。后端结构分为多个模块，每个模块负责应用程序的不同方面。

## 目录结构

- [api](api/README.md) - API路由定义和WebSocket处理
- [config](config/README.md) - 配置设置和环境管理
- [database](database/README.md) - 数据库连接和模型定义
- [factors](factors/README.md) - 交易因子和算法
- [repositories](repositories/README.md) - 数据库操作的数据访问层
- [schemas](schemas/README.md) - 数据验证模式和模型
- [services](services/README.md) - 业务逻辑和服务实现

## 主要组件

- `main.py` - 应用程序入口点
- `models.py` - 共享数据模型
- `pyproject.toml` - 项目依赖和元数据
- `verify_trades_display.py` - 交易验证和显示功能