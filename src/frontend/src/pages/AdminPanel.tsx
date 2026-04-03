import type { AdmissionInquiry, ContactSubmission } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useActor } from "@/hooks/useActor";
import {
  ClipboardList,
  Loader2,
  LogOut,
  Mail,
  RefreshCw,
  ShieldCheck,
  Trash2,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";

const ADMIN_PASSWORD = "dinfotech@admin";

function formatDate(timestamp: bigint): string {
  return new Date(Number(timestamp) / 1_000_000).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

type EnquiryEntry = { id: bigint; data: AdmissionInquiry };

export default function AdminPanel() {
  const { actor, isFetching } = useActor();
  const [password, setPassword] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState("");

  const [enquiries, setEnquiries] = useState<EnquiryEntry[]>([]);
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [loadingData, setLoadingData] = useState(false);
  const [dataError, setDataError] = useState("");
  const [fetchDone, setFetchDone] = useState(false);
  const [deletingId, setDeletingId] = useState<bigint | null>(null);

  const fetchData = useCallback(
    async (pwd: string) => {
      if (!actor) return;
      setLoadingData(true);
      setDataError("");
      try {
        const [enqData, ctData] = await Promise.all([
          actor.getAdmissionInquiriesWithIdsAdmin(pwd),
          actor.getContactSubmissionsAdmin(pwd),
        ]);
        const mapped: EnquiryEntry[] = (enqData as [bigint, AdmissionInquiry][])
          .map(([id, data]) => ({ id, data }))
          .sort((a, b) => Number(b.data.timestamp - a.data.timestamp));
        setEnquiries(mapped);
        setContacts(ctData as ContactSubmission[]);
        setFetchDone(true);
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        setDataError(
          `Failed to load data: ${msg}. Please click Refresh to try again.`,
        );
        console.error(err);
      } finally {
        setLoadingData(false);
      }
    },
    [actor],
  );

  useEffect(() => {
    if (isLoggedIn && actor && !fetchDone && adminPassword) {
      fetchData(adminPassword);
    }
  }, [isLoggedIn, actor, fetchDone, fetchData, adminPassword]);

  async function handleDeleteEnquiry(id: bigint) {
    if (!actor) return;
    setDeletingId(id);
    try {
      await actor.deleteAdmissionInquiryAdmin(adminPassword, id);
      setEnquiries((prev) => prev.filter((e) => e.id !== id));
    } catch (err) {
      console.error("Failed to delete enquiry:", err);
    } finally {
      setDeletingId(null);
    }
  }

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");
    const trimmed = password.trim();
    if (trimmed === ADMIN_PASSWORD) {
      setAdminPassword(trimmed);
      setIsLoggedIn(true);
    } else {
      setLoginError("Incorrect password. Please try again.");
    }
  }

  function handleLogout() {
    setIsLoggedIn(false);
    setPassword("");
    setAdminPassword("");
    setEnquiries([]);
    setContacts([]);
    setDataError("");
    setFetchDone(false);
  }

  function handleRefresh() {
    setFetchDone(false);
    fetchData(adminPassword);
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="bg-orange-600 rounded-t-lg text-white text-center py-8">
            <div className="flex justify-center mb-3">
              <ShieldCheck className="h-12 w-12 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold">
              D-Infotech Admin
            </CardTitle>
            <p className="text-orange-100 text-sm mt-1">
              Restricted Access — Staff Only
            </p>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="admin-password" className="text-gray-700">
                  Admin Password
                </Label>
                <Input
                  id="admin-password"
                  type="password"
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                  required
                />
              </div>
              {loginError && (
                <p className="text-red-600 text-sm">{loginError}</p>
              )}
              <Button
                type="submit"
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2"
              >
                Enter Admin Panel
              </Button>
            </form>
            <p className="text-center text-xs text-gray-400 mt-4">
              Contact your system administrator if you&apos;ve forgotten your
              password.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const actorLoading = isFetching || (!actor && !dataError && !fetchDone);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-orange-600 text-white px-6 py-4 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <ShieldCheck className="h-6 w-6" />
          <div>
            <h1 className="text-xl font-bold">Admin Panel</h1>
            <p className="text-orange-200 text-xs">
              D-Infotech Computer Institute
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            className="border-white text-white hover:bg-orange-700 bg-transparent"
            onClick={handleRefresh}
            disabled={loadingData || actorLoading}
          >
            {loadingData ? (
              <Loader2 className="h-4 w-4 mr-1 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4 mr-1" />
            )}
            Refresh
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-white text-white hover:bg-orange-700 bg-transparent"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-1" /> Logout
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {actorLoading && (
          <div className="mb-4 p-4 bg-orange-50 border border-orange-200 text-orange-700 rounded-md text-sm flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Connecting to backend, please wait...
          </div>
        )}

        {dataError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
            {dataError}
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 mb-8">
          <Card className="border-l-4 border-l-orange-600">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="bg-orange-100 p-3 rounded-full">
                <ClipboardList className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Admission Enquiries</p>
                <p className="text-3xl font-bold text-orange-600">
                  {enquiries.length}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Mail className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Contact Messages</p>
                <p className="text-3xl font-bold text-blue-600">
                  {contacts.length}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="enquiries">
          <TabsList className="mb-4">
            <TabsTrigger value="enquiries">
              Admission Enquiries
              {enquiries.length > 0 && (
                <Badge className="ml-2 bg-orange-600 text-white text-xs">
                  {enquiries.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="contacts">
              Contact Messages
              {contacts.length > 0 && (
                <Badge className="ml-2 bg-blue-600 text-white text-xs">
                  {contacts.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="enquiries">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-gray-800">
                  Admission Enquiries ({enquiries.length} total)
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loadingData ? (
                  <div className="flex justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-orange-600" />
                  </div>
                ) : enquiries.length === 0 ? (
                  <div className="text-center py-12 text-gray-400">
                    <ClipboardList className="h-16 w-16 mx-auto mb-4 opacity-30" />
                    <p className="text-lg font-medium">No enquiries yet</p>
                    <p className="text-sm">
                      Admission enquiries will appear here once submitted.
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-orange-50">
                          <TableHead className="font-semibold text-orange-800">
                            #
                          </TableHead>
                          <TableHead className="font-semibold text-orange-800">
                            Name
                          </TableHead>
                          <TableHead className="font-semibold text-orange-800">
                            Phone
                          </TableHead>
                          <TableHead className="font-semibold text-orange-800">
                            Email
                          </TableHead>
                          <TableHead className="font-semibold text-orange-800">
                            Course
                          </TableHead>
                          <TableHead className="font-semibold text-orange-800">
                            Message
                          </TableHead>
                          <TableHead className="font-semibold text-orange-800">
                            Date
                          </TableHead>
                          <TableHead className="font-semibold text-orange-800">
                            Action
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {enquiries.map((enq, idx) => (
                          <TableRow
                            key={String(enq.id)}
                            className="hover:bg-orange-50/50"
                          >
                            <TableCell className="text-gray-500 text-sm">
                              {idx + 1}
                            </TableCell>
                            <TableCell className="font-medium">
                              {enq.data.name}
                            </TableCell>
                            <TableCell>{enq.data.phone}</TableCell>
                            <TableCell className="text-blue-600">
                              {enq.data.email}
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className="border-orange-300 text-orange-700 bg-orange-50"
                              >
                                {enq.data.course}
                              </Badge>
                            </TableCell>
                            <TableCell className="max-w-xs">
                              <p className="truncate text-sm text-gray-600">
                                {enq.data.message}
                              </p>
                            </TableCell>
                            <TableCell className="text-sm text-gray-500 whitespace-nowrap">
                              {formatDate(enq.data.timestamp)}
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                onClick={() => handleDeleteEnquiry(enq.id)}
                                disabled={deletingId === enq.id}
                              >
                                {deletingId === enq.id ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <Trash2 className="h-4 w-4" />
                                )}
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contacts">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-gray-800">
                  Contact Messages ({contacts.length} total)
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loadingData ? (
                  <div className="flex justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                  </div>
                ) : contacts.length === 0 ? (
                  <div className="text-center py-12 text-gray-400">
                    <Mail className="h-16 w-16 mx-auto mb-4 opacity-30" />
                    <p className="text-lg font-medium">No messages yet</p>
                    <p className="text-sm">
                      Contact form submissions will appear here.
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-blue-50">
                          <TableHead className="font-semibold text-blue-800">
                            #
                          </TableHead>
                          <TableHead className="font-semibold text-blue-800">
                            Name
                          </TableHead>
                          <TableHead className="font-semibold text-blue-800">
                            Email
                          </TableHead>
                          <TableHead className="font-semibold text-blue-800">
                            Message
                          </TableHead>
                          <TableHead className="font-semibold text-blue-800">
                            Date
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {contacts.map((ct, idx) => (
                          <TableRow
                            key={`${ct.email}-${String(ct.timestamp)}`}
                            className="hover:bg-blue-50/50"
                          >
                            <TableCell className="text-gray-500 text-sm">
                              {idx + 1}
                            </TableCell>
                            <TableCell className="font-medium">
                              {ct.name}
                            </TableCell>
                            <TableCell className="text-blue-600">
                              {ct.email}
                            </TableCell>
                            <TableCell className="max-w-sm">
                              <p className="text-sm text-gray-600 whitespace-pre-wrap">
                                {ct.message}
                              </p>
                            </TableCell>
                            <TableCell className="text-sm text-gray-500 whitespace-nowrap">
                              {formatDate(ct.timestamp)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
