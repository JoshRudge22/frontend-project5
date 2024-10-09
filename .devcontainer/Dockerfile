FROM ubuntu:22.04

# Environment variables
ENV NODE_MAJOR 16
ENV DEBIAN_FRONTEND=noninteractive

# Install dependencies and Node.js in one step
RUN apt-get update && apt-get install -y --no-install-recommends \
    make \
    build-essential \
    libssl-dev \
    libpq-dev \
    zlib1g-dev \
    libbz2-dev \
    libreadline-dev \
    libsqlite3-dev \
    wget \
    ca-certificates \
    curl \
    gnupg \
    llvm \
    libncurses5-dev \
    xz-utils \
    tk-dev \
    libxml2-dev \
    libxmlsec1-dev \
    libffi-dev \
    liblzma-dev \
    mecab-ipadic-utf8 \
    git \
    postgresql-client \
    telnet \
    unzip \
    && rm -rf /var/lib/apt/lists/*

# Install Node.js
RUN curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg && \
    echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list && \
    apt-get update && \
    apt-get install -y nodejs && \
    rm -rf /var/lib/apt/lists/*

# Create a non-root user
ARG USERNAME=cistudent
RUN useradd -ms /bin/bash $USERNAME

# Switch to non-root user
USER $USERNAME
WORKDIR /home/$USERNAME

# Update PATH
ENV PATH=$PATH:"/home/$USERNAME/.local/bin"

# Set up bash aliases
RUN echo 'alias psql="psql mydb"' >> ~/.bashrc
COPY ./build-assets/heroku_config.sh /home/$USERNAME/.theia/heroku_config.sh
RUN echo 'alias heroku_config=". $HOME/.theia/heroku_config.sh"' >> ~/.bashrc

# Change ownership of the .theia directory
USER root
RUN chown -R $USERNAME:$USERNAME /home/$USERNAME/.theia

# Switch back to non-root user
USER $USERNAME

# Keep the container running with an interactive shell
CMD ["/bin/bash"]
