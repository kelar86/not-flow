from mindsdb_sdk import connect
from mindsdb_sdk.server import Server


class MindsDBClient:
    def __init__(self, host: str = "http://127.0.0.1:47334"):
        self.client = connect(host)

    def get_client(self) -> Server:
        return self.client

# Create a singleton instance
mindsdb_client = MindsDBClient()
