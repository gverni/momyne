# momyne
MOnitor MY NEtwork devices 

This is an attempt at creating a tool to monitor the status of the server / services in your house / organization. 

# Configuration

The configuration is currently done through a `config.json` file in the root of the express app. Below an example of the file, limited ping and HTTP/HTTPS services: 

```

{
  "options": {},
  "hosts": [ { "address": "192.168.0.2",
              "name": "MyServer",
              "services": [ { "name" : "ping", "protocol": "ping" },
                            { "name" : "nginx", "protocol": "https", "port": "8080", "path": "/"},
              },
              { "address": "192.168.0.3",
                "name": "MyOtherServer",
                "services": [ { "name" : "ping", "protocol": "ping" },
                              { "name" : "nginx", "protocol": "https", "port": "", "path": "/service1/"} ]
              } ]
  }
  ```
