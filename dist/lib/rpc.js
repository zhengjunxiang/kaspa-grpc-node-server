"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RPC = void 0;
const client_1 = require("./client");
class RPC {
    constructor(options = {}) {
        if (options.client) {
            this.client = options.client;
        }
        else {
            this.client = new client_1.Client(options.clientConfig || {});
            this.client.connect();
        }
    }
    request(method, data) {
        return this.client.call(method, data);
    }
    getBlock(hash) {
        return this.request('getBlockRequest', { hash, includeBlockVerboseData: true });
    }
    getAddressTransactions(address, limit, skip) {
        return this.request('getAddressTransactions', { address, limit, skip });
    }
    getUtxos(address, limit, skip) {
        return this.request('getUTXOsByAddressRequest', { address, limit, skip });
    }
    postTx(transactionHex) {
        return this.request('submitTransactionRequest', { transactionHex });
    }
}
exports.RPC = RPC;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnBjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL3JwYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxQ0FBZ0M7QUFHaEMsTUFBYSxHQUFHO0lBRWYsWUFBWSxVQUFZLEVBQUU7UUFDekIsSUFBRyxPQUFPLENBQUMsTUFBTSxFQUFDO1lBQ2pCLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztTQUM3QjthQUFJO1lBQ0osSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLGVBQU0sQ0FBQyxPQUFPLENBQUMsWUFBWSxJQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ25ELElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDdEI7SUFDRixDQUFDO0lBQ0QsT0FBTyxDQUFDLE1BQWEsRUFBRSxJQUFRO1FBQzlCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFDRCxRQUFRLENBQUMsSUFBVztRQUNuQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLEVBQUUsRUFBQyxJQUFJLEVBQUUsdUJBQXVCLEVBQUMsSUFBSSxFQUFDLENBQStCLENBQUM7SUFDNUcsQ0FBQztJQUNELHNCQUFzQixDQUFDLE9BQWMsRUFBRSxLQUFZLEVBQUUsSUFBVztRQUMvRCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsd0JBQXdCLEVBQUUsRUFBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBQyxDQUErQixDQUFDO0lBQ3JHLENBQUM7SUFDRCxRQUFRLENBQUMsT0FBYyxFQUFFLEtBQVksRUFBRSxJQUFXO1FBQ2pELE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQywwQkFBMEIsRUFBRSxFQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFDLENBQXlCLENBQUM7SUFDakcsQ0FBQztJQUNELE1BQU0sQ0FBQyxjQUFzQjtRQUM1QixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsMEJBQTBCLEVBQUUsRUFBQyxjQUFjLEVBQUMsQ0FBa0MsQ0FBQztJQUNwRyxDQUFDO0NBQ0Q7QUF6QkQsa0JBeUJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDbGllbnR9IGZyb20gJy4vY2xpZW50JztcbmltcG9ydCB7SVJQQywgQXBpfSBmcm9tICcuLi90eXBlcy9jdXN0b20tdHlwZXMnO1xuXG5leHBvcnQgY2xhc3MgUlBDIGltcGxlbWVudHMgSVJQQ3tcblx0Y2xpZW50OkNsaWVudDtcblx0Y29uc3RydWN0b3Iob3B0aW9uczphbnk9e30pe1xuXHRcdGlmKG9wdGlvbnMuY2xpZW50KXtcblx0XHRcdHRoaXMuY2xpZW50ID0gb3B0aW9ucy5jbGllbnQ7XG5cdFx0fWVsc2V7XG5cdFx0XHR0aGlzLmNsaWVudCA9IG5ldyBDbGllbnQob3B0aW9ucy5jbGllbnRDb25maWd8fHt9KTtcblx0XHRcdHRoaXMuY2xpZW50LmNvbm5lY3QoKTtcblx0XHR9XG5cdH1cblx0cmVxdWVzdChtZXRob2Q6c3RyaW5nLCBkYXRhOmFueSl7XG5cdFx0cmV0dXJuIHRoaXMuY2xpZW50LmNhbGwobWV0aG9kLCBkYXRhKTtcblx0fVxuXHRnZXRCbG9jayhoYXNoOnN0cmluZyk6IFByb21pc2U8QXBpLkJsb2NrUmVzcG9uc2U+e1xuXHRcdHJldHVybiB0aGlzLnJlcXVlc3QoJ2dldEJsb2NrUmVxdWVzdCcsIHtoYXNoLCBpbmNsdWRlQmxvY2tWZXJib3NlRGF0YTp0cnVlfSkgYXMgUHJvbWlzZTxBcGkuQmxvY2tSZXNwb25zZT47XG5cdH1cblx0Z2V0QWRkcmVzc1RyYW5zYWN0aW9ucyhhZGRyZXNzOnN0cmluZywgbGltaXQ6bnVtYmVyLCBza2lwOm51bWJlcik6IFByb21pc2U8QXBpLlRyYW5zYWN0aW9uW10+e1xuXHRcdHJldHVybiB0aGlzLnJlcXVlc3QoJ2dldEFkZHJlc3NUcmFuc2FjdGlvbnMnLCB7YWRkcmVzcywgbGltaXQsIHNraXB9KSBhcyBQcm9taXNlPEFwaS5UcmFuc2FjdGlvbltdPjtcblx0fVxuXHRnZXRVdHhvcyhhZGRyZXNzOnN0cmluZywgbGltaXQ6bnVtYmVyLCBza2lwOm51bWJlcik6IFByb21pc2U8QXBpLlV0eG9bXT57XG5cdFx0cmV0dXJuIHRoaXMucmVxdWVzdCgnZ2V0VVRYT3NCeUFkZHJlc3NSZXF1ZXN0Jywge2FkZHJlc3MsIGxpbWl0LCBza2lwfSkgYXMgIFByb21pc2U8QXBpLlV0eG9bXT47XG5cdH1cblx0cG9zdFR4KHRyYW5zYWN0aW9uSGV4OiBzdHJpbmcpOiBQcm9taXNlPEFwaS5TdWNjZXNzUmVzcG9uc2U+e1xuXHRcdHJldHVybiB0aGlzLnJlcXVlc3QoJ3N1Ym1pdFRyYW5zYWN0aW9uUmVxdWVzdCcsIHt0cmFuc2FjdGlvbkhleH0pIGFzICBQcm9taXNlPEFwaS5TdWNjZXNzUmVzcG9uc2U+O1xuXHR9XG59Il19