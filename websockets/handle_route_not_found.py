import logging


class RouteNotFoundMiddleware:
    def __init__(self, app):
        self.app = app

    async def __call__(self, scope, receive, send):
        try:
            return await self.app(scope, receive, send)
        except ValueError as e:
            if "No route found for path" in str(e) and scope["type"] == "websocket":
                await send({"type": "websocket.close"})
                logging.warning(e)
            else:
                raise e
