# Install requirements 

## Create virutal env: 
```
python -m venv .env
```

## Activate: 
```
source .env/bin/activate
```

## Install dependencies: 
```
pip install -r requirements.txt
```



# Start backend:
If you want to change port, go to `main.py` and change it under `uvicorn.run()`.
Then start server: 
```
python main.py
```