# 使用官方 Node.js 镜像作为基础镜像
FROM node:22-alpine

# 设置工作目录
WORKDIR /app

# 将 package.json 和 package-lock.json 复制到工作目录
COPY package*.json ./

# 安装项目依赖
RUN npm install

# 将所有文件复制到工作目录
COPY . .

# 构建项目
RUN npm run build

# 暴露端口
EXPOSE 3000

# 启动项目
CMD ["npm", "run", "preview"]
