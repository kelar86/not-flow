from mindsdb_sdk import connect

class MindsDBClient:
    def __init__(self, host: str = "http://127.0.0.1:47334"):
        self.client = connect(host)

    def get_client(self):
        return self.client

# Create a singleton instance
mindsdb_client = MindsDBClient()
