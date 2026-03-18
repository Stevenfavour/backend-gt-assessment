## 1. Scaling

If this task API starts receiving thousands of requests per minute, these are some of the problems that can occur.

* Single point of failure: The whole service now depends on one Node.js instance. If that process crashes or becomes unresponsive, every client request fails. There is no provision fallback or redundancy mecchanism.

* Memory overload & out‑of‑memory crashes: Under heavy load the system can grow very large, eventually exhausting the server's memory allocation and causing the process to be killed.

* Unhandled request spikes can exhaust the event‑loop:
 Because the server processes every request on a single Node.js thread, a sudden burst of thousands of    simultaneous connections can keep the event loop busy for too long. While the loop is busy, it can’t accept new connections, causing request timeouts and 5xx
errors even though the code itself is correct. This is a simple scalability bottleneck that appears as “the API becomes unresponsive” under heavy load. 

## 2. Performance Improvements

 * Horizontal scaling: With Node processes behind a load balancer, the total request handling capacity is multiplied.

 * Rate limiting: More like an API‑gateway limits, it protects the server from being flooded, returning 429 instead of queuing indefinitely.

 * Single point of Filaure: Multi‑instance service behind a managed LB, target groups and health checks, multi‑AZ deployment.

 * Memory pressure: Move task data to a managed DB (persistent) and optional Redis cache; containers stay stateless.


## 2. Production Monitoring

 Resource usage: 
 * cpu percentage usage: cpu_percent > 85 % sustained > 30 s 
* memory usage: memory_rss > 80 %    

 Database:
 * db_query_latency
 * db_connection_errors

 Traffic:

 * Request_rate: Detect spikes, usage patterns, and whether load‑balancing is working.