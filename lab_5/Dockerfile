FROM  astral/uv:alpine

WORKDIR /app

COPY uv.lock hello.py pyproject.toml .python-version ./

RUN uv sync --locked

EXPOSE 5000


CMD [ "uv", "run", "flask", "--app", ".\hello.py", "run" ]
