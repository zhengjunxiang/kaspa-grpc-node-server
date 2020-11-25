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
    disconnect() {
        var _a;
        (_a = this.client) === null || _a === void 0 ? void 0 : _a.disconnect();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnBjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL3JwYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxQ0FBZ0M7QUFHaEMsTUFBYSxHQUFHO0lBRWYsWUFBWSxVQUFZLEVBQUU7UUFDekIsSUFBRyxPQUFPLENBQUMsTUFBTSxFQUFDO1lBQ2pCLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztTQUM3QjthQUFJO1lBQ0osSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLGVBQU0sQ0FBQyxPQUFPLENBQUMsWUFBWSxJQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ25ELElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDdEI7SUFDRixDQUFDO0lBQ0QsVUFBVTs7UUFDVCxNQUFBLElBQUksQ0FBQyxNQUFNLDBDQUFFLFVBQVUsR0FBRztJQUMzQixDQUFDO0lBQ0QsT0FBTyxDQUFDLE1BQWEsRUFBRSxJQUFRO1FBQzlCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFDRCxRQUFRLENBQUMsSUFBVztRQUNuQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLEVBQUUsRUFBQyxJQUFJLEVBQUUsdUJBQXVCLEVBQUMsSUFBSSxFQUFDLENBQStCLENBQUM7SUFDNUcsQ0FBQztJQUNELHNCQUFzQixDQUFDLE9BQWMsRUFBRSxLQUFZLEVBQUUsSUFBVztRQUMvRCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsd0JBQXdCLEVBQUUsRUFBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBQyxDQUErQixDQUFDO0lBQ3JHLENBQUM7SUFDRCxRQUFRLENBQUMsT0FBYyxFQUFFLEtBQVksRUFBRSxJQUFXO1FBQ2pELE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQywwQkFBMEIsRUFBRSxFQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFDLENBQXdDLENBQUM7SUFDaEgsQ0FBQztJQUNELE1BQU0sQ0FBQyxjQUFzQjtRQUM1QixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsMEJBQTBCLEVBQUUsRUFBQyxjQUFjLEVBQUMsQ0FBa0MsQ0FBQztJQUNwRyxDQUFDO0NBQ0Q7QUE1QkQsa0JBNEJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDbGllbnR9IGZyb20gJy4vY2xpZW50JztcbmltcG9ydCB7SVJQQywgQXBpfSBmcm9tICcuLi90eXBlcy9jdXN0b20tdHlwZXMnO1xuXG5leHBvcnQgY2xhc3MgUlBDIGltcGxlbWVudHMgSVJQQ3tcblx0Y2xpZW50OkNsaWVudDtcblx0Y29uc3RydWN0b3Iob3B0aW9uczphbnk9e30pe1xuXHRcdGlmKG9wdGlvbnMuY2xpZW50KXtcblx0XHRcdHRoaXMuY2xpZW50ID0gb3B0aW9ucy5jbGllbnQ7XG5cdFx0fWVsc2V7XG5cdFx0XHR0aGlzLmNsaWVudCA9IG5ldyBDbGllbnQob3B0aW9ucy5jbGllbnRDb25maWd8fHt9KTtcblx0XHRcdHRoaXMuY2xpZW50LmNvbm5lY3QoKTtcblx0XHR9XG5cdH1cblx0ZGlzY29ubmVjdCgpe1xuXHRcdHRoaXMuY2xpZW50Py5kaXNjb25uZWN0KCk7XG5cdH1cblx0cmVxdWVzdChtZXRob2Q6c3RyaW5nLCBkYXRhOmFueSl7XG5cdFx0cmV0dXJuIHRoaXMuY2xpZW50LmNhbGwobWV0aG9kLCBkYXRhKTtcblx0fVxuXHRnZXRCbG9jayhoYXNoOnN0cmluZyk6IFByb21pc2U8QXBpLkJsb2NrUmVzcG9uc2U+e1xuXHRcdHJldHVybiB0aGlzLnJlcXVlc3QoJ2dldEJsb2NrUmVxdWVzdCcsIHtoYXNoLCBpbmNsdWRlQmxvY2tWZXJib3NlRGF0YTp0cnVlfSkgYXMgUHJvbWlzZTxBcGkuQmxvY2tSZXNwb25zZT47XG5cdH1cblx0Z2V0QWRkcmVzc1RyYW5zYWN0aW9ucyhhZGRyZXNzOnN0cmluZywgbGltaXQ6bnVtYmVyLCBza2lwOm51bWJlcik6IFByb21pc2U8QXBpLlRyYW5zYWN0aW9uW10+e1xuXHRcdHJldHVybiB0aGlzLnJlcXVlc3QoJ2dldEFkZHJlc3NUcmFuc2FjdGlvbnMnLCB7YWRkcmVzcywgbGltaXQsIHNraXB9KSBhcyBQcm9taXNlPEFwaS5UcmFuc2FjdGlvbltdPjtcblx0fVxuXHRnZXRVdHhvcyhhZGRyZXNzOnN0cmluZywgbGltaXQ6bnVtYmVyLCBza2lwOm51bWJlcik6IFByb21pc2U8QXBpLlVUWE9zQnlBZGRyZXNzUmVzcG9uc2U+e1xuXHRcdHJldHVybiB0aGlzLnJlcXVlc3QoJ2dldFVUWE9zQnlBZGRyZXNzUmVxdWVzdCcsIHthZGRyZXNzLCBsaW1pdCwgc2tpcH0pIGFzIFByb21pc2U8QXBpLlVUWE9zQnlBZGRyZXNzUmVzcG9uc2U+O1xuXHR9XG5cdHBvc3RUeCh0cmFuc2FjdGlvbkhleDogc3RyaW5nKTogUHJvbWlzZTxBcGkuU3VjY2Vzc1Jlc3BvbnNlPntcblx0XHRyZXR1cm4gdGhpcy5yZXF1ZXN0KCdzdWJtaXRUcmFuc2FjdGlvblJlcXVlc3QnLCB7dHJhbnNhY3Rpb25IZXh9KSBhcyAgUHJvbWlzZTxBcGkuU3VjY2Vzc1Jlc3BvbnNlPjtcblx0fVxufSJdfQ==